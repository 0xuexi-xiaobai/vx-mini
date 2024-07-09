package com.xjtlu.aimini.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

//产品
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Component
@Data
@Builder
@TableName("user")
public class Product {

    private Long id;

    private String name;

    private String description;

    //图片链接
    private String imageUrl;

    //所属产品分类id
    private String category;

    //所属产品分类id
    private long cateId;

    //产品链接
    private String url;

    //产品logo链接
    private String logoUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
