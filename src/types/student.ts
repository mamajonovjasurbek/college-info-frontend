export interface IStudent {
    id: string;
    name: string;
    birth_date: {
        String: string | unknown;
        Valid: boolean;
    };
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
