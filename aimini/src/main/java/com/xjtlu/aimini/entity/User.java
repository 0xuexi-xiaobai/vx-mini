package com.xjtlu.aimini.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDateTime;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Component
@Data
@Builder
@TableName("user")
public class User implements Serializable {

//    注册的时候要用到的
    @TableId(type = IdType.AUTO)
    private Long id;

    private String openid;

    @TableField(insertStrategy = FieldStrategy.NOT_EMPTY) // 仅在 nickname 不为空时插入
    private String username;

    private String password;
    private String email;
    private int gender;

    private String phone;

    private LocalDateTime createTime;
//    the time that the user registered
//    private String born_time;

//    private List<Integer> thumbUpArticle;













}
