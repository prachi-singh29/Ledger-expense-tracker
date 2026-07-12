package com.expensetracker.service;

import com.expensetracker.dto.ExpenseRequest;
import com.expensetracker.dto.ExpenseResponse;
import com.expensetracker.dto.SummaryResponse;
import com.expensetracker.entity.Expense;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public List<ExpenseResponse> getAll() {
        return expenseRepository.findAllByOrderByDateDescCreatedAtDesc()
                .stream()
                .map(ExpenseResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public ExpenseResponse getById(Long id) {
        return ExpenseResponse.fromEntity(findEntity(id));
    }

    public ExpenseResponse create(ExpenseRequest request) {
        Expense expense = Expense.builder()
                .title(request.getTitle())
                .amount(request.getAmount())
                .type(request.getType())
                .category(request.getCategory())
                .description(request.getDescription())
                .date(request.getDate())
                .build();
        return ExpenseResponse.fromEntity(expenseRepository.save(expense));
    }

    public ExpenseResponse update(Long id, ExpenseRequest request) {
        Expense expense = findEntity(id);
        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setType(request.getType());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        if (request.getDate() != null) {
            expense.setDate(request.getDate());
        }
        return ExpenseResponse.fromEntity(expenseRepository.save(expense));
    }

    public void delete(Long id) {
        Expense expense = findEntity(id);
        expenseRepository.delete(expense);
    }

    public SummaryResponse getSummary() {
        List<Expense> all = expenseRepository.findAllByOrderByDateDescCreatedAtDesc();

        BigDecimal totalIncome = all.stream()
                .filter(e -> e.getType() == Expense.TransactionType.INCOME)
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = all.stream()
                .filter(e -> e.getType() == Expense.TransactionType.EXPENSE)
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, BigDecimal> byCategory = new LinkedHashMap<>();
        all.stream()
                .filter(e -> e.getType() == Expense.TransactionType.EXPENSE)
                .forEach(e -> byCategory.merge(e.getCategory(), e.getAmount(), BigDecimal::add));

        List<ExpenseResponse> recent = all.stream()
                .limit(6)
                .map(ExpenseResponse::fromEntity)
                .collect(Collectors.toList());

        return SummaryResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .balance(totalIncome.subtract(totalExpense))
                .transactionCount(all.size())
                .byCategory(byCategory)
                .recent(recent)
                .build();
    }

    private Expense findEntity(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
    }
}
