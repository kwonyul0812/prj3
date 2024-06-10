package com.backend.controller.promotion;

import com.backend.domain.promotion.Promotion;
import com.backend.service.promotion.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @PostMapping("/add")
    public void addPromo(@RequestBody Promotion promotion) {

        promotionService.addPromo(promotion);
    }

    @GetMapping("/list")
    public List<Promotion> listPromotion() {
        return promotionService.list();
    }

    @GetMapping("{id}")
    public Promotion getPromotion(@PathVariable Integer id) {
        return promotionService.get(id);
    }
}
