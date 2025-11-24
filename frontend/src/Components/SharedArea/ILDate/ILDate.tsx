import moment from "moment";
import "./ILDate.css";

interface ILDateProps{
    date:Date;
}

function ILDate(props: ILDateProps): JSX.Element {
    return (
			<span>{moment(props.date).format('DD/MM/YYYY')} </span>
    );
}

export default ILDate;
