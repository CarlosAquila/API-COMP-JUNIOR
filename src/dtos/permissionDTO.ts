interface IPermissionDTO {
  name: string;
  description?: string;
}

class PermissionDTO implements IPermissionDTO{
  name: string;
  description?: string;

  constructor(data: IPermissionDTO) {
      this.name = this.validateName(data.name);
      this.description = this.validateDescription(data.description);
  }

  private validateName(name: string): string {
      if (!name) {
          throw new Error("Name is required");
      }
      return name;
  }

  private validateDescription(description?: string): string | undefined{
      return description;
  }
}

export default PermissionDTO;