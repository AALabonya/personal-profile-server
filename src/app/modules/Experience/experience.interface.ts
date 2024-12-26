export type TExperience = {
    title: string;
    company: string;
    employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
    startDate: string;
    endDate: string | "Present";
    duration: string;
    location: string;
    description: string;
    responsibilities: string[];
};
