import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";

import { useToast } from "./ui/use-toast";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      emailjs
        .send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,

            from_email: form.email,

            message: form.message,
          },
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            setLoading(false);
            toast({
              title: "Thanks for reaching out.",
              description: "I'll get back to you asap.",
            });

            setForm({
              name: "",
              email: "",
              message: "",
            });
          },
          (error) => {
            setLoading(false);
            console.error(error);

            toast({
              title: "It worked on my machine",
              description: "Will try to fix this issue.",
            });
          }
        );
    } catch {
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "It worked on my machine",
          description: "Will try to fix this issue.",
        });
      }, 5000);
    }
  };

  return (
    <motion.div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <div className="flex-[.75] bg-black-100 ">
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className="  flex  flex-col md:flex-row  gap-4 mt-8">
          <Button
            variant="link"
            className="p-6 border border-neutral-700 transition duration-200 hover:border-white hover:cursor-pointer"
          >
            <Link to="https://www.linkedin.com/in/pranayhpatle/">LinkedIn</Link>
          </Button>
          <Button
            variant="link"
            className="p-6 border border-neutral-700 transition duration-200 hover:border-white hover:cursor-pointer"
          >
            <Link to="https://www.instagram.com/campooter_ng_near/">
              Instagram
            </Link>
          </Button>
          <Button
            variant="link"
            className="p-6 border border-neutral-700 transition duration-200 hover:border-white hover:cursor-pointer"
          >
            <Link to="mailto:pranayhpatle@gmail.com">
              pranayhpatle@gmail.com
            </Link>
          </Button>
          <Button
            variant="link"
            className="p-6 border border-neutral-700 transition duration-200 hover:border-white hover:cursor-pointer"
          >
            <span>+918180875642</span>
          </Button>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Micheal Scott"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="michealscott@dundermifflin.com"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="World's Best Boss"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8  outline-none w-fit text-white font-bold shadow-md shadow-primary border"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(Contact, "contact");
