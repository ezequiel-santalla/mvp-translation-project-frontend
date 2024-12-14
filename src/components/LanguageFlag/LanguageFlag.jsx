import Flag from "react-world-flags";

export const LanguageFlag = ({ countryCode, className }) => {
  return <Flag code={countryCode} className={className}/>;
};
