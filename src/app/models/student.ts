export class Student {
  id: number;
  name: string;
  age: number;
  grade: number;
  level: string;

  constructor(
    id: number,
    name: string,
    age: number,
    grade: number,
    level: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.grade = grade;
    this.level = level;
  }
}
