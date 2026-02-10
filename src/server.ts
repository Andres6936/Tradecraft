const Priority = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
} as const;

const PRODUCTS = {
  Computer: {
    Id: 93,
    Name: "Computer",
    Order: 899,
    Priority: Priority.High,
  },
  Smartphone: {
    Id: 94,
    Name: "Smartphone",
    Order: 540,
    Priority: Priority.High,
  },
  Lumber: {
    Id: 48,
    Name: "Lumber",
    Order: 320,
    Priority: Priority.High,
  },
  Circuit: {
    Id: 92,
    Name: "Circuit",
    Order: 232,
    Priority: Priority.High,
  },
  Furniture: {
    Id: 49,
    Name: "Furniture",
    Order: 227,
    Priority: Priority.High,
  },
  Log: {
    Id: 47,
    Name: "Log",
    Order: 152,
    Priority: Priority.High,
  },
  Beeswax: {
    Id: 55,
    Name: "Beeswax",
    Order: 111,
    Priority: Priority.High,
  },
  Shoes: {
    Id: 111,
    Name: "Shoes",
    Order: 105,
    Priority: Priority.Medium,
  },
  Microchip: {
    Id: 69,
    Name: "Microchip",
    Order: 40,
    Priority: Priority.Low,
  },
  Butter: {
    Id: 25,
    Name: "Butter",
    Order: 36,
    Priority: Priority.Low,
  },
  Sneakers: {
    Id: 113,
    Name: "Sneakers",
    Order: 20,
    Priority: Priority.Low,
  },
} as const;

export { Priority, PRODUCTS };
