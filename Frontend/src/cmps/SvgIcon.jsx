import { svgService } from "../services/svg.service.js"

const SvgIcon = ({ iconName, className }) => {
const svg = svgService.getSvg(iconName)
return <i dangerouslySetInnerHTML={{ __html: svg }} className={className}></i>
}

export default SvgIcon