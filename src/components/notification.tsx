import { cutDateWithTime} from "../utils/helper-functions.ts";
import {INotification} from "../types/notification.ts";

interface  IProps {
    data : INotification
}

export const Notification  = ({data} : IProps) =>{
    return (
        <div className="p-3 shadow">
            <div style={{
                color: "white",
                backgroundColor : data.action_color,
                borderRadius : "5px",
                padding : "4px",
                fontSize : "12px",
                textAlign : "center",
            }}>{data.action_text}</div>
            <div className="mb-1 mt-1">
                Название:{data.name ? data.name : "Неизвестно"}
            </div>
            <div className="mb-1 mt-1">
                Изменил:{data.action_by_name ? data.action_by_name : "Неизвестно"}
            </div>
            <div className="mb-1">
                Изменeн:{data.item_text}
            </div>
            <div className="mb-1">
                 Время:{cutDateWithTime(data.created_at)}
            </div>
        </div>
    )
}