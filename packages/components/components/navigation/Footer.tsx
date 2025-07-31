import Image from "next/image";
import Link from "next/link";
import { Navigation, SocialNetwork } from "@repo/types";
import { socialNetworkIconStyles, SocialNetworkName } from "@repo/types/social";
import { useSiteContext } from "../../contexts/SiteContextProvider";

interface FooterProps {
  navigation?: Navigation;
  socialNetworks?: SocialNetwork[];
}

const defaultNavAttributes = {
  ownerId: "",
  lastUpdateBy: null,
  createdDate: 0,
  id: "default",
  "@version": 1,
  name: "Default Footer Navigation",
  modelId: "navigation",
  published: "published",
  priority: 0,
  query: [],
  lastUpdated: 0,
  firstPublished: 0,
  testRatio: 0,
  createdBy: "",
  lastUpdatedBy: "",
};

const defaultFooterNav: Navigation = {
  data: {
    level1: [
      { text: "Terms of Service", href: "/terms" },
      { text: "Refund Policy", href: "/refund" },
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Contact Us", href: "/contact" },
      { text: "Affiliates", href: "/affiliates" },
      { text: "Blogs", href: "/blogs" },
    ],
  },
  ...defaultNavAttributes,
};

const Footer = ({
  navigation: footerNav = defaultFooterNav,
  socialNetworks,
}: FooterProps) => {
  const { siteContext } = useSiteContext();

  const socialNav = socialNetworks || siteContext?.data?.socialNetworks || [];

  // Get navigation items with fallback
  const navItems = (footerNav || defaultFooterNav).data.level1;

  return (
    <footer
      data-theme="gradient"
      className="py-12 font-sans"
      style={{ color: "var(--theme-text)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <Link href="/" className="block">
            <div className="relative w-40 md:w-[200px] h-[60px]">
              <Image
                src="/SMA_Logo_Light_Slim.avif"
                alt="The Silva Method - Atlanta & Western North Carolina"
                width={200}
                height={60}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                priority={false}
              />
            </div>
          </Link>

          {/* Logo and Navigation Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <nav>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {navItems.map((item) => (
                  <div className="disc-none" key={item.text}>
                    <Link
                      className="hover:text-accent-magenta"
                      style={{ color: "var(--theme-text)" }}
                      href={item.href || "/"}
                    >
                      {item.text}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          {/* Social Media Icons */}
          {socialNav && socialNav.length > 0 && (
            <div className="flex justify-center space-x-6 mb-8">
              {socialNav.map((social: SocialNetwork) => {
                const iconClass =
                  socialNetworkIconStyles[social.name as SocialNetworkName];
                if (!iconClass) return null; // Skip if network not supported

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-cyan text-white"
                  >
                    <span className="sr-only">{social.name}</span>
                    <i className={`${iconClass} h-6 w-6 text-2xl`} />
                  </a>
                );
              })}
            </div>
          )}

          {/* Copyright */}
          <div className="text-sm">
            © {new Date().getFullYear()} Silva Method Atlanta. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export default Footer;
