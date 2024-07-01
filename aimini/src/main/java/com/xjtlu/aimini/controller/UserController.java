package com.xjtlu.aimini.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xjtlu.aimini.dto.UserLoginDTO;
import com.xjtlu.aimini.entity.Result;
import com.xjtlu.aimini.service.Impl.UserServiceImpl;
import com.xjtlu.aimini.vo.DashScopeVO;
import com.xjtlu.aimini.vo.UserLoginVO;
import com.xjtlu.aimini.util.JwtUtil;
import com.xjtlu.aimini.constant.JwtClaimsConstant;
import com.xjtlu.aimini.properties.JwtProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.xjtlu.aimini.entity.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private JwtProperties jwtProperties;

    @GetMapping("/register")
    public String register(@RequestBody String json) {
        User user = JSON.parseObject(json, User.class);
        User name = new User();
        name.setUsername(user.getUsername());
        boolean exist = userService.exist(name);
        if (exist) {
            Result res = Result.create(300, "name duplicated", user.getUsername());
            return JSON.toJSONString(res);
        }
        int succ = userService.saveUser(user);
        if (succ == 1) {
            Result res = Result.create(200, "register success", user.getUsername());
            return JSON.toJSONString(res);
        }else {
            Result res = Result.create(300, "register fail", user.getUsername());
            return JSON.toJSONString(res);
        }
    }

    @GetMapping (value = "/getPerson")
    public String getUser(@RequestParam (name = "author_id") int id) {
        User user = userService.getUser(id);

        Result result = Result.create(200, "get user successful", user);
        log.info("获取{}用户成功", user.getUsername());
        return JSON.toJSONString(result);
    }

    /**
     * 个人详情页获取用户信息+点赞/收藏/创作过的文章
     * @param id 用户id
     * @return 用户信息+点赞/收藏/创作过的文章
     *
     */
    @GetMapping (value = "/getPersonInfo")
    public String getUserInfo(@RequestParam (name = "author_id") int id) {
        User user = userService.getUser(id);

        Result result = Result.create(200, "get user successful", user);
        log.info("获取" + user.getUsername() + "用户信息成功");
        return JSON.toJSONString(result);
    }


//login

    /**
     * 登陆 login
     * @param userLogin (user)
     * @return 成功信息或失败信息
     */
    @PostMapping("/login")
    public Result login(@RequestBody String userLogin){
        UserLoginDTO userLoginDTO = JSON.parseObject(userLogin, UserLoginDTO.class);
        log.info("微信用户登录：{}",userLoginDTO.getCode());

        //微信登录
        User user = userService.wxLogin(userLoginDTO);

        //为微信用户生成jwt令牌
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.USER_ID,user.getId());
        String token = JwtUtil.createJWT(jwtProperties.getUserSecretKey(), jwtProperties.getUserTtl(), claims);

        UserLoginVO userLoginVO = UserLoginVO.builder()
                .id(user.getId())
                .openid(user.getOpenid())
                .token(token)
                .build();
        String res = JSON.toJSONString(userLoginVO);
        return Result.success(res);
    }

    /**
     * 编辑用户个人信息
     * @param userInfo
     * @return code + message + data:用户完整信息
     */
    @PostMapping("/editProfile")
    public String editUser(@RequestBody String userInfo){
        log.info(userInfo);
        User u = JSON.parseObject(userInfo, User.class);
        System.out.println(u);
        User former = userService.getUser(u.getId());
        System.out.println("former:" + former);
        u.setPassword(former.getPassword());
        if(!u.getUsername().equals(former.getUsername())){
            if(userService.getUserId(u.getUsername()) != -1){
                return JSON.toJSONString(Result.create(300, "username already exists, change another name"));
            }
        }
        int success = userService.editUser(u);
        if(success == 1) {
            log.info("用户信息修改成功");
            return JSON.toJSONString(Result.create(200, "edit user information successfully", u));
        } else {
            log.info("用户信息修改失败");
            return JSON.toJSONString(Result.create(300, "fail to edit user information"));
        }

    }

    @PostMapping (value = "/changePassword")
    public String changePassword(@RequestBody String userInfo) {
        JSONObject object = JSONObject.parseObject(userInfo);
        String newPassword = object.getString("password");
        long id = object.getLongValue("user_id");
        User user = new User();
        user.setId(id);
        user.setPassword(newPassword);
        int success = userService.editUser(user);
        if(success == 1) {
            log.info("用户密码修改成功");
            return JSON.toJSONString(Result.create(200, "change password successfully"));
        } else {
            log.info("用户密码修改失败");
            return JSON.toJSONString(Result.create(300, "fail to change password"));
        }
    }

    @GetMapping("/callDashScope")
    public String callDashScope(@RequestBody String json){
        String prompt = JSON.parseObject(json, DashScopeVO.class).getPrompt();
        String res = userService.callDashScope(prompt);

        return JSON.toJSONString(new DashScopeVO(res));
    }

}
