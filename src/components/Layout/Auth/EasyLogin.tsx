import React from "react";
import kakaotalkLoge from "@/assets/images/social/kakaotalk-logo.svg";
import googleLoge from "@/assets/images/social/google-logo.svg";
import styles from "./Auth.module.scss";

interface Image {
  src: string;
  alt: string;
  width: number;
}

interface Link {
  href: string;
  target: string;
  rel: string;
  img: Image;
}

const Links: { [id: string]: Link } = {
  googleLink: {
    href: "https://www.google.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    img: {
      src: googleLoge,
      alt: "구글",
      width: 42,
    },
  },
  kakaoLink: {
    href: "https://www.kakaocorp.com/page/",
    target: "_blank",
    rel: "noopener noreferrer",
    img: {
      src: kakaotalkLoge,
      alt: "카카오톡",
      width: 42,
    },
  },
};

const EasyLogin: React.FC = () => {
  return (
    <section className={styles["easy-login"]}>
      <h3>간편 로그인하기</h3>
      <div>
        {Object.entries(Links).map(
          ([
            key,
            {
              href,
              target,
              rel,
              img: { src, alt, width },
            },
          ]) => (
            <a key={key} href={href} target={target} rel={rel}>
              <img src={src} alt={alt} width={width} />
            </a>
          )
        )}
      </div>
    </section>
  );
};

export default EasyLogin;
