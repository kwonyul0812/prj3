package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService service;

    @GetMapping("{nickName}")
    public ResponseEntity checkNickName(@PathVariable String nickName) {
        if (service.get(nickName) == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @PostMapping("signup")
    public ResponseEntity signup(@RequestBody Member member) {
        service.add(member);
        return ResponseEntity.ok().build();
    }

    @PostMapping("token")
    public ResponseEntity token(@RequestBody Member member) {
        Map<String, Object> map = service.getToken(member);
        if (map != null) {
            return ResponseEntity.ok(map);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
