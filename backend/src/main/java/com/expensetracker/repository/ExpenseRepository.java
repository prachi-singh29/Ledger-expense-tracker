package com.expensetracker.repository;

import com.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findAllByOrderByDateDescCreatedAtDesc();

    List<Expense> findByCategoryIgnoreCase(@Param("category") String category);

    List<Expense> findByType(Expense.TransactionType type);
}
