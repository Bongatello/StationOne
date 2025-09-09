import { svgService } from "../services/svg.service.js";

const SvgIcon = ({ iconName }) => {
const svg = svgService.getSvg(iconName);
return <i dangerouslySetInnerHTML={{ __html: svg }}></i>;
};

export default SvgIcon;