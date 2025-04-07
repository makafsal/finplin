import { Content, Link } from "@carbon/react";
import { ArrowRight } from "@carbon/react/icons";

export const NotFound = () => {
  return (
    <Content>
      <h4>404 Page not found </h4>
      <br />
      <Link href="/" renderIcon={ArrowRight}>
        Back to home
      </Link>
    </Content>
  );
};
