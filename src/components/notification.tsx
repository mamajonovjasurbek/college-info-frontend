import { cutDateWithTime} from "../utils/helper-functions.ts";

interface  IProps {
    data : INotification
}

export const Notification  = ({data} : IProps) =>{
    let statusColor = ""
    let statusText = ""
    let mode = ""
    switch (data.action) {
        case 1:
            statusColor = 'green'
            statusText  = 'Создан'
            break
        case 2:
            statusColor = 'orange'
            statusText  = 'Изменен'
            break
        case 3:
            statusColor = 'red'
            statusText  = 'Удален'
            break
        default:
            statusColor = 'grey'
            statusText  = 'Неизвестно'
            break
    }

    switch (data.item_id) {
        case 1:
            mode = "Студент"
            break
        case 2:
            mode = "Пользователь"
            break

        default:
            mode = "Неизветсно"
            break
    }

    return (
        <div className="p-3 shadow">
            <div style={{
                color: "white",
                backgroundColor : statusColor,
                borderRadius : "5px",
                padding : "4px",
                fontSize : "12px",
                textAlign : "center",
            }}>{statusText}</div>
            <div className="mb-1 mt-1">
                Название:{data.name ? data.name : "Неизвестно"}
            </div>
            <div className="mb-1 mt-1">
                Изменил:{data.action_by ? data.action_by : "Неизвестно"}
            </div>
            <div className="mb-1">
                Изменeн:{mode}
            </div>
            <div className="mb-1">
                 Время:{cutDateWithTime(data.created_at)}
            </div>
        </div>
    )
}