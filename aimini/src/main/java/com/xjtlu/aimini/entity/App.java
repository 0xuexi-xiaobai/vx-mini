package com.xjtlu.aimini.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class App {

    private String id;

    private String name;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
