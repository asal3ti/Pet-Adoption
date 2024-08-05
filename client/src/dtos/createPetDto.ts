export interface CreatePetDTO {
  animalId: string;
  intakeType: string;
  inDate: string; // Consider using Date type if you are handling dates more rigorously
  petName: string;
  animalType: string;
  petAge: number;
  petSize: string;
  color: string;
  breed: string;
  sex: string;
  url?: string; // Optional field
  crossing?: string; // Optional field
}
