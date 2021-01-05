import s from "./Container.module.css";
import PropTypes from "prop-types";

export default function Container({ children }) {
  return <div className={s.div}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.any.isRequired,
};
