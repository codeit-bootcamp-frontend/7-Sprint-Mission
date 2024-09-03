import "./Footer.css";
import facebookLogo from "@/assets/images/social/facebook-logo.svg";
import twitterLogo from "@/assets/images/social/twitter-logo.svg";
import youtubeLogo from "@/assets/images/social/youtube-logo.svg";
import instagramLogo from "@/assets/images/social/instagram-logo.svg";
import { Link } from "react-router-dom";

interface Image {
  src: string;
  alt: string;
  width: number;
}

interface SocialLink {
  href: string;
  img: Image;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com",
    img: {
      src: facebookLogo,
      alt: "페이스북",
      width: 20,
    },
  },
  {
    href: "https://twitter.com/",
    img: {
      src: twitterLogo,
      alt: "트위터",
      width: 20,
    },
  },
  {
    href: "https://www.youtube.com/",
    img: {
      src: youtubeLogo,
      alt: "유튜브",
      width: 20,
    },
  },
  {
    href: "https://www.instagram.com/",
    img: {
      src: instagramLogo,
      alt: "인스타그램",
      width: 20,
    },
  },
];

interface FooterLink {
  to: string;
  text: string;
}

const footerLinks: FooterLink[] = [
  { to: "/privacy", text: "Privacy Policy" },
  { to: "/faq", text: "FAQ" },
];

const Footer: React.FC = () => {
  return (
    <footer>
      <div id="copyright">©codeit - 2024</div>
      <div id="footerMenu">
        {footerLinks.map(({ to, text }, index) => (
          <Link key={index} to={to}>
            {text}
          </Link>
        ))}
      </div>
      <div id="socialMedia">
        {socialLinks.map(({ href, img: { src, alt, width } }) => (
          <a key={alt} href={href} target="_blank" rel="noopener noreferrer">
            <img src={src} alt={alt} width={width} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
