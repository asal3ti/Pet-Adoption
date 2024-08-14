export interface CreatePetDTO {
  animalId: string;
  intakeType: string;
  inDate: string; // Consider using Date type if you are handling dates more rigorously
  petName: string;
  animalType: string;
  petAge?: number | string; // Make petAge optional
  petSize: string;
  color: string;
  breed: string;
  sex: "F" | "M" | "S";
  url?: string; // Optional field
  crossing?: boolean | string; // Optional field
  ageUnknown?: boolean; // New field for checkbox
}
