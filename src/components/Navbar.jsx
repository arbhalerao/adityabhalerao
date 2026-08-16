import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import { TbBrandGithub, TbBrandLinkedin, TbBrandMedium } from "react-icons/tb";
import { useNavigateAndScroll } from "../hooks/useNavigateAndScroll";
import { PROFILES } from "../seo/siteMeta";

const SECTIONS = [
    { id: "hero", label: "Intro" },
    { id: "tech", label: "Tech" },
    { id: "experience", label: "Experience", mobileLabel: "Experiences" },
    { id: "oss", label: "OSS" },
    { id: "projects", label: "Projects" },
    { id: "blogs", label: "Blogs" },
    { id: "papershelf", label: "Papershelf" },
];

const SOCIALS = [
    { href: PROFILES.linkedin, label: "Aditya Bhalerao on LinkedIn", Icon: TbBrandLinkedin },
    { href: PROFILES.github, label: "Aditya Bhalerao on GitHub", Icon: TbBrandGithub },
    { href: PROFILES.medium, label: "Aditya Bhalerao on Medium", Icon: TbBrandMedium },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const navigateAndScroll = useNavigateAndScroll();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { pathname } = useLocation();
    const onHome = pathname === "/";

    const RESUME_URL = "https://drive.google.com/file/d/12k8htg9CS3fOwn5GKpeUynS15ZxbMGE2/view";

    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') ||
                (localStorage.getItem('theme') === 'dark');
            setIsDarkMode(isDark);
        };

        setMounted(true);
        checkDarkMode();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const menuOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path, section) => {
        navigateAndScroll(path, section);
        setActiveSection(section);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = SECTIONS.map((s) => s.id).concat('contact');
            let largestVisibleSection = null;
            let maxVisibleHeight = 0;

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

                    if (visibleHeight > maxVisibleHeight) {
                        maxVisibleHeight = visibleHeight;
                        largestVisibleSection = section;
                    }
                }
            });

            if (largestVisibleSection && largestVisibleSection !== activeSection) {
                setActiveSection(largestVisibleSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);


    const getNavItemClass = (section) => {
        const baseClasses = "cursor-pointer transition-all duration-300 flex items-center";

        if (onHome && section === activeSection) {
            return `${baseClasses} text-gray-900 dark:text-white opacity-100 font-medium transform scale-125`;
        }

        return `${baseClasses} text-gray-700 dark:text-white opacity-70 hover:opacity-100`;
    };

    // Real anchors (crawlable + keyboard accessible) that keep the smooth-scroll behaviour.
    const sectionLinkProps = (id, extra = {}) => ({
        href: id === "hero" ? "/" : `/#${id}`,
        "aria-current": onHome && activeSection === id ? "true" : undefined,
        onClick: (e) => {
            e.preventDefault();
            handleNavigation("/", id);
            extra.onClick?.();
        },
    });

    const logoSrc = isDarkMode ? "/aditya-logo-light.svg" : "/aditya-logo-dark.svg";

    return (
        <header className="fixed top-0 w-full flex justify-center z-10">
            <div className="w-full border-b border-black hover:border-brand transition-colors bg-[#f3f3f3]">
              <div className="w-full px-8 py-4 flex items-center">
                <div className="flex-1 flex justify-center">
                  <span className="text-brand text-3xl select-none" aria-hidden="true">&lt;</span>
                </div>
                <div className="flex items-center gap-10">
                <Link to="/" aria-label="Aditya Bhalerao — home" className="cursor-pointer">
                    {mounted && (
                        <img src={logoSrc} alt="Aditya Bhalerao logo" width="40" height="40" className="h-10 w-10" />
                    )}
                </Link>

                {/* Desktop Nav */}
                <nav aria-label="Primary" className="hidden md:block">
                <ul className="flex gap-8 items-center">
                    {SECTIONS.map(({ id, label }) => (
                        <li key={id}>
                            <a {...sectionLinkProps(id)} className={getNavItemClass(id)}>{label}</a>
                        </li>
                    ))}
                    <li>
                        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
                            className="cursor-pointer transition-all duration-300 text-gray-700 dark:text-white opacity-70 hover:opacity-100">
                            Resume
                        </a>
                    </li>
                    <li>
                        <a {...sectionLinkProps("contact")} className={getNavItemClass("contact")}>Contact</a>
                    </li>
                </ul>
                </nav>

                {/* Social Links */}
                <ul className="hidden md:flex gap-5 items-center">
                    {SOCIALS.map(({ href, label, Icon }) => (
                        <li key={href} className="cursor-pointer opacity-70 transition-all duration-300 hover:text-brand hover:opacity-100">
                            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                                <Icon className="text-2xl text-brand" strokeWidth={2.2} />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Icon */}
                <div className="flex items-center md:hidden">
                    <button
                        type="button"
                        onClick={menuOpen}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? (
                            <BiX className="block md:hidden text-4xl text-gray-800 dark:text-white" />
                        ) : (
                            <BiMenu className="block md:hidden text-4xl text-gray-800 dark:text-white" />
                        )}
                    </button>
                </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-brand text-3xl select-none" aria-hidden="true">&gt;</span>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="fixed top-20 left-0 right-0 mx-4 bg-[#f3f3f3] dark:bg-black rounded-lg border border-black shadow-md z-50">
                        <div className="p-4">
                            <nav aria-label="Mobile" className="flex flex-col space-y-3 text-center">
                                {SECTIONS.map(({ id, label, mobileLabel }) => (
                                    <a key={id}
                                        {...sectionLinkProps(id, { onClick: menuOpen })}
                                        className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${onHome && activeSection === id ? "font-bold" : ""}`}>
                                        {mobileLabel ?? label}
                                    </a>
                                ))}
                                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" onClick={menuOpen}
                                    className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white">
                                    Resume
                                </a>
                                <a {...sectionLinkProps("contact", { onClick: menuOpen })}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${onHome && activeSection === "contact" ? "font-bold" : ""}`}>
                                    Contact
                                </a>
                            </nav>

                            <div className="flex justify-center mt-4 pt-4 border-t border-black dark:border-gray-800">
                                {SOCIALS.map(({ href, label, Icon }) => (
                                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="mx-3">
                                        <Icon className="text-2xl text-brand" strokeWidth={2.2} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </div>
        </header>
    );
};

export default Navbar;
