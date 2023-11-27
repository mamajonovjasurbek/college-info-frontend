export interface IStudent {
    id?: string;
    name: string;
    birth_date: IBirthDate;
    location: string;
    pass_number: string;
    phone_number: string;
    pinfl: string;
    study_dir: string;
    course: string;
    father: string;
    mother: string;
    group: string;
}

export interface IBirthDate {
    String: string | unknown;
    Valid: boolean;
}
