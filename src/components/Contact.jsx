import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";
import { ChevronUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

export default function ContactSection() {
    const { theme } = useTheme();
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigateToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 1500);
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData(form.current);
        const data = {
            sender_name: formData.get("sender_name").trim(),
            sender_email: formData.get("sender_email").trim(),
            subject: formData.get("subject").trim(),
            message: formData.get("message").trim()
        };

        if (!data.sender_name || !data.sender_email || !data.subject || !data.message) {
            showMessage("Please fill in all the fields");
            setLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.sender_email)) {
            showMessage("Please enter a valid email address");
            setLoading(false);
            return;
        }

        if (data.message.length > 1000) {
            showMessage("Message should not exceed 1000 characters");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showMessage("Email sent successfully!");
                form.current.reset();
            } else {
                throw new Error();
            }
        } catch {
            showMessage("Failed to send email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact" className="flex flex-col items-center w-full px-8 py-16 pt-24 relative">
            <div className="flex flex-col items-center justify-center space-y-8 p-4 sm:p-14 w-full max-w-5xl">
                <div className="title-container">
                    <motion.h1
                        variants={variants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            duration: 0.5,
                            scale: { duration: 0.2 }
                        }}
                        className="section-title no-underline">
                        Lets Connect!
                    </motion.h1>
                </div>

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}
                    className="flex flex-col space-y-6 text-center w-full"
                    noValidate
                >
                    <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
                        <input
                            type="text"
                            name="sender_name"
                            placeholder="Name *"
                            required
                            className="w-full md:w-1/2 p-3 text-lg border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-[#111132] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="email"
                            name="sender_email"
                            placeholder="Email *"
                            required
                            className="w-full md:w-1/2 p-3 text-lg border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-[#111132] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject *"
                        required
                        className="w-full p-3 text-lg border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-[#111132] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <textarea
                        name="message"
                        placeholder="Message *"
                        rows="4"
                        required
                        className="w-full p-3 text-lg border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-[#111132] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    ></textarea>

                    <div className="h-10 flex items-center justify-center">
                        {message && (
                            <p className={`text-lg font-semibold ${message === "Email sent successfully!" ? "text-green-400" : "text-red-400"}`}>
                                {message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-[200px] md:w-[300px] mx-auto rounded-lg border border-indigo-600 bg-gray-100 dark:bg-[#111132] px-5 py-3 text-lg font-bold text-gray-900 dark:text-white shadow-lg shadow-indigo-300 dark:shadow-indigo-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-300 dark:hover:shadow-purple-700"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </motion.form>

                <div className="flex items-center w-full max-w-3xl space-x-4 text-gray-500">
                    <hr className="flex-grow border-t border-gray-400 dark:border-gray-600" />
                    <span className="text-lg text-gray-600 dark:text-gray-400">Or</span>
                    <hr className="flex-grow border-t border-gray-400 dark:border-gray-600" />
                </div>

                <motion.div
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}
                    className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6"
                >
                    <a
                        href="https://github.com/arbhalerao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-orange-600 bg-gray-100 dark:bg-[#111132] px-6 py-3 text-lg font-semibold text-orange-400 shadow-lg shadow-orange-300 dark:shadow-orange-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-300 dark:hover:shadow-orange-700 w-full max-w-[300px] lg:w-[280px] justify-center"
                    >
                        <FaGithub size={24} />
                        <span>Follow on GitHub</span>
                    </a>

                    <a
                        href="https://arbhalerao.medium.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-green-700 bg-gray-100 dark:bg-[#111132] px-6 py-3 text-lg font-semibold text-green-500 shadow-lg shadow-green-400 dark:shadow-green-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400 dark:hover:shadow-green-700 w-full max-w-[300px] lg:w-[280px] justify-center"
                    >
                        <FaMedium size={24} />
                        <span>Follow on Medium</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/arbhalerao/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-blue-600 bg-gray-100 dark:bg-[#111132] px-6 py-3 text-lg font-semibold text-blue-400 shadow-lg shadow-blue-300 dark:shadow-blue-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-300 dark:hover:shadow-blue-700 w-full max-w-[300px] lg:w-[280px] justify-center"
                    >
                        <FaLinkedin size={24} />
                        <span>Connect on LinkedIn</span>
                    </a>
                </motion.div>
                <div className="h-32"></div>
            </div>

            <motion.div
                className="absolute bottom-10 flex flex-col items-center cursor-pointer"
                onClick={navigateToTop}
                initial={{ y: 10, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
                <ChevronUp className="h-10 w-10 text-gray-700 dark:text-gray-300 animate-bounce stroke-[2.5]" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Go back to top</span>
            </motion.div>
        </div >
    );
}
