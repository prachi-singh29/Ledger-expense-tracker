package com.expensetracker.dto;

import com.expensetracker.entity.Expense;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 120, message = "Title must be under 120 characters")
    private String title;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Type is required")
    private Expense.TransactionType type;

    @NotBlank(message = "Category is required")
    @Size(max = 60)
    private String category;

    @Size(max = 255)
    private String description;

    private LocalDate date;
}
