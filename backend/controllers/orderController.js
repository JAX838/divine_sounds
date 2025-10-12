const Order = require("../models/Order");
const Product = require("../models/Product");

const { sendSMS } = require("../utils/smsService");
exports.placeOrder = async (req, res) => {
  try {
    const { customerName, phoneNumber, items } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    for (let i of items) {
      const product = await Product.findById(i.product);

      if (!product) {
        return res
          .status(404)
          .json({ message: ` Product ${i.product} not found` });
      }

      orderItems.push({
        product: product._id,
        productName: product.name,
        price: product.price,
        quantity: i.quantity,
      });

      totalAmount += product.price * i.quantity;
    }

    const newOrder = new Order({
      customerName,
      phoneNumber,
      items: orderItems,
      totalAmount,
    });

    await newOrder.save();

    // ✅ Send SMS immediately after order is placed
    let smsMessage = `✅ Hello ${customerName}, we have RECEIVED your order!\n\n📦 Items:\n`;
    orderItems.forEach((item) => {
      smsMessage += `- ${item.productName} x${item.quantity} @ KES ${item.price}\n`;
    });
    smsMessage += `\n💰 Total Payable: KES ${totalAmount}\n\n⏱️ You’ll get updates once it’s confirmed and shipped.`;

    try {
      const normalizedPhone =
        phoneNumber && phoneNumber.startsWith("+")
          ? phoneNumber
          : phoneNumber && `+${phoneNumber.replace(/\D/g, "")}`;

      if (normalizedPhone) await sendSMS(normalizedPhone, smsMessage);
      else console.warn("Skipping SMS: invalid phone format", phoneNumber);
    } catch (err) {
      console.error(
        "SMS failed (non-blocking):",
        err?.response?.data || err.message || err
      );
    }

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("items.product");
  res.status(200).json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ SMS content based on status
    let smsMessage = "";
    if (status === "Confirmed") {
      smsMessage = `✅ Hello ${order.customerName}, your order has been CONFIRMED. Total: KES ${order.totalAmount}. We will notify you when it's shipped.`;
    } else if (status === "Shipped") {
      smsMessage = `📦 Hello ${order.customerName}, your order is now SHIPPED and on the way!`;
    } else if (status === "Delivered") {
      smsMessage = ` 🎉 Hello ${order.customerName}, your order has been DELIVERED. Thank you for shopping with us!`;
    }

    // Send SMS
    if (smsMessage) {
      try {
        const normalizedPhone =
          order.phoneNumber && order.phoneNumber.startsWith("+")
            ? order.phoneNumber
            : order.phoneNumber && `+${order.phoneNumber.replace(/\D/g, "")}`;

        if (normalizedPhone) await sendSMS(normalizedPhone, smsMessage);
        else
          console.warn("Skipping SMS: invalid phone format", order.phoneNumber);
      } catch (err) {
        console.error(
          "SMS failed (non-blocking):",
          err?.response?.data || err.message || err
        );
      }
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({
      id: order._id,
      customerName: order.customerName,
      phoneNumber: order.phoneNumber,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items.map((i) => ({
        productId: i.product,
        productName: i.productName,
        price: i.price,
        quantity: i.quantity,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: `Order by ${order.customerName} deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
