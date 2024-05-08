import e from "express";

interface EmployeeDTO {
    name: string;
    cpf: string;
    telephone: string;
    address: string;
}

class EmployeeDTO {
    constructor(data: EmployeeDTO) {
        this.name = this.validateName(data.name);
        this.cpf = this.validateCpf(data.cpf);
        this.telephone = this.validateTelephone(data.telephone);
        this.address = this.validateAddress(data.address);
    }

    private validateName(name: string): string {
        if (!name) {
            throw new Error("Name is required");
        }
        return name;
    }

    private validateCpf(cpf: string): string {
        if (!cpf) {
            throw new Error("CPF is required");
        }
        else if (cpf.length !== 11) {
            throw new Error("CPF must have 11 characters");
        }
        return cpf;
    }

    private validateTelephone(telephone: string): string {
        if (telephone && telephone.length < 9) {
            throw new Error("Telephone must have at least 10 characters");
        }
        return telephone;
    }

    private validateAddress(address: string): string {
        return address;
    }
}

export default EmployeeDTO;
