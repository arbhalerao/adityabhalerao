import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TbBrandLinkedin, TbBrandGithub, TbBrandMedium } from "react-icons/tb";
import { ChevronUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.currentTarget.closest("[id]").scrollIntoView({ behavior: "smooth" })} className="section-title no-underline cursor-pointer">
                        Let's Connect!
                    </motion.h1>
                </div>

                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="flex flex-col space-y-6 text-center w-full"
                    noValidate
                >
                    <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
                        <input
                            type="text"
                            name="sender_name"
                            placeholder="Name *"
                            required
                            className="w-full md:w-1/2 p-3 text-lg border border-black dark:border-gray-600 bg-gray-100 dark:bg-[#3a3d40] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-brand transition-colors"
                        />
                        <input
                            type="email"
                            name="sender_email"
                            placeholder="Email *"
                            required
                            className="w-full md:w-1/2 p-3 text-lg border border-black dark:border-gray-600 bg-gray-100 dark:bg-[#3a3d40] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-brand transition-colors"
                        />
                    </div>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject *"
                        required
                        className="w-full p-3 text-lg border border-black dark:border-gray-600 bg-gray-100 dark:bg-[#3a3d40] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-brand transition-colors"
                    />

                    <textarea
                        name="message"
                        placeholder="Message *"
                        rows="4"
                        required
                        className="w-full p-3 text-lg border border-black dark:border-gray-600 bg-gray-100 dark:bg-[#3a3d40] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-brand transition-colors resize-none"
                    ></textarea>

                    <div className="h-10 flex items-center justify-center">
                        {message && (
                            <p className="text-lg font-normal text-brand">
                                {message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-[200px] md:w-[300px] mx-auto rounded-lg border border-brand bg-gray-100 dark:bg-[#3a3d40] px-5 py-3 text-lg font-normal text-brand transition-all duration-300 hover:scale-105"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>

                <div className="flex items-center w-full space-x-4 text-gray-500">
                    <hr className="flex-grow border-t border-black dark:border-gray-600" />
                    <span className="text-lg text-gray-600 dark:text-gray-400">or find me on</span>
                    <hr className="flex-grow border-t border-black dark:border-gray-600" />
                </div>

                <div className="flex flex-row items-center justify-center gap-8">
                    <a
                        href="https://www.linkedin.com/in/arbhalerao/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-brand transition-transform duration-300 hover:scale-110"
                    >
                        <TbBrandLinkedin size={36} strokeWidth={1.5} />
                    </a>

                    <a
                        href="https://github.com/arbhalerao"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-brand transition-transform duration-300 hover:scale-110"
                    >
                        <TbBrandGithub size={36} strokeWidth={1.5} />
                    </a>

                    <a
                        href="https://arbhalerao.medium.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Medium"
                        className="text-brand transition-transform duration-300 hover:scale-110"
                    >
                        <TbBrandMedium size={36} strokeWidth={1.5} />
                    </a>
                </div>
                <div className="h-32"></div>
            </div>

            <motion.div
                className="absolute bottom-10 flex flex-col items-center cursor-pointer"
                onClick={navigateToTop}
                initial={{ y: 10, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
                <ChevronUp className="h-10 w-10 text-brand animate-bounce stroke-[2.5]" />
            </motion.div>
        </div >
    );
}
