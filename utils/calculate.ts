export const calculateAge = (birthDate: string | Date): number => {
  const today = new Date();
  let birth: Date;

  // Check if birthDate is a string or Date
  if (typeof birthDate === "string") {
    birth = new Date(birthDate);
  } else if (birthDate instanceof Date) {
    birth = birthDate;
  } else {
    throw new Error(
      "Invalid date format. Please provide a valid date string or Date object."
    );
  }

  // Calculate age
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};
