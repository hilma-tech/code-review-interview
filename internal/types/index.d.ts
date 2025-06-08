export namespace DepartmentResponse {
  export interface DepartmentDetails {
    name: string;
    departmentCode: string | null;
    rooms: { name: string; roomCode: string | null }[];
  }
}
