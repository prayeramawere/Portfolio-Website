const express = require("express");
const { testimonials } = require("../data.js");

const getTestimonials = (req, res) => {
  res.status(200).json({ success: true, data: testimonials });
};

const clientLogin = (req, res) => {
  const { username, secret } = req.body;

  if (username && secret) {
    const token = jwt.sign({ username, secret }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const code = secretCodes.find((code) => (code = secret));
    if (!code) {
      return res
        .status(401)
        .json({ success: false, msg: "invalid secret code" });
    }
    return res.status(200).json({ success: true, token: token });
  }
};
const createTestimonial = (req, res) => {
  const { name, role, message, image } = req.body;

  if (name && role && message && image) {
    //add testimonial to the database
    try {
      const testimonial = {
        id: 7,
        username: name,
        testimony: message,
        image: image,
        date: new Date(),
      };
      testimonials.push(testimonial);
      res.status(200).json({
        success: true,
        msg: "you have successfully submitted your tesimonial",
      });
    } catch (error) {
      res
        .status(400)
        .json(`problem occured while creating testimonial, ${error}`);
    }
  } else {
    res
      .status()
      .json({ success: false, msg: "please provide all required details" });
  }
};
const deleteTestimonial = (req, res) => {
  const { id } = req.params;

  const testimonial = testimonials.find((test) => test.id === Number(id));
  if (!testimonial) {
    res
      .status()
      .json({ success: false, msg: `cannot find testimonial with id ${id}` });
  }
  try {
    const newTesimonials = testimonials.filter(
      (test) => test.id !== Number(id)
    );
    res.status(201).json({ success: true, data: newTesimonials });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: `failed to complete delete operation, ${error}`,
    });
  }
};

module.exports = {
  createTestimonial,
  deleteTestimonial,
  clientLogin,
  getTestimonials,
};
