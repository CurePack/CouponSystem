import moment from "moment";
import "./ILTime.css";

interface ILTimeProps{
    date:Date;
}

function ILTime(props:ILTimeProps): JSX.Element {
    return (
			<span> {moment(props.date).format('hh:mm:ss')}</span>
    );
}

export default ILTime;
