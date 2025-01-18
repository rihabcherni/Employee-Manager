import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent implements OnInit {
  employees: Employee[] = [];
  page = 1;
  pageSize = 10;
  totalEmployees = 0;
  sortedColumn: keyof Employee = 'id'; 
  isAsc: boolean = true;

  columns: { label: string; key: keyof Employee }[] = [
    { label: 'ID', key: 'id' },
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Age', key: 'age' },
    { label: 'Date of Birth', key: 'dob' },
    { label: 'Email', key: 'email' },
    { label: 'Salary', key: 'salary' },
    { label: 'Address', key: 'address' },
    { label: 'Contact Number', key: 'contactNumber' },
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees(): void {
    this.employeeService.getEmployees(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => console.error('Error fetching employees:', err),
    });    
  
    this.employeeService.getTotalEmployees().subscribe({
      next: (data) => {
        this.totalEmployees = data;
      },
      error: (err) => console.error('Error fetching total employees:', err),
    });
  }
  
  getTotalPages(): number {
    const totalPages = Math.ceil(this.totalEmployees / this.pageSize);
    return totalPages;
  }
  
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.loadEmployees();
      this.page = page;
    } else {
      console.log(`Page change rejected. Current page: ${this.page}`);
    }
  }
  
  onSort(column: keyof Employee): void {
    this.isAsc = this.sortedColumn === column ? !this.isAsc : true;
    this.sortedColumn = column;

    this.employees.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      return aValue < bValue ? (this.isAsc ? -1 : 1) : aValue > bValue ? (this.isAsc ? 1 : -1) : 0;
    });
  }
}
