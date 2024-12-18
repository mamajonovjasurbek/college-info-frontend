export interface INotification {
    id  : string,
    name : string,
    item_id : number,
    item_text : string,
    action : number,
    action_text : string,
    action_color: string,
    action_by : number ,
    action_by_name: string,
    view : boolean,
    created_at : string
}