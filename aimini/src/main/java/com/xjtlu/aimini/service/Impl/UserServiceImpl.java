package com.xjtlu.aimini.service.Impl;

import com.alibaba.dashscope.exception.ApiException;
import com.alibaba.dashscope.exception.InputRequiredException;
import com.alibaba.dashscope.exception.NoApiKeyException;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xjtlu.aimini.constant.MessageConstant;
import com.xjtlu.aimini.entity.User;
import com.xjtlu.aimini.exception.LoginFailedException;
import com.xjtlu.aimini.mapper.UserMapper;
import com.xjtlu.aimini.properties.WeChatProperties;
import com.xjtlu.aimini.service.UserService;
import com.xjtlu.aimini.util.DashScopeUtil;
import com.xjtlu.aimini.util.HttpClientUtil;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xjtlu.aimini.dto.UserLoginDTO;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
public class UserServiceImpl implements UserService {

    //微信服务接口地址
    public static final String WX_LOGIN = "https://api.weixin.qq.com/sns/jscode2session";

    @Autowired
    private WeChatProperties weChatProperties;

    @Resource
    private UserMapper userMapper;

    @Override
    public int saveUser(User u) {
        u.setCreatedAt(LocalDateTime.now());
         return userMapper.insert(u);
    }

    @Override
    public boolean exist(User u){
        return userMapper.exists(new QueryWrapper<>(u));
    }


    @Override
    public User getUser(long id) {
        boolean exist = userMapper.exists(new QueryWrapper<User>().eq("id", id));
        if (exist) {
            return userMapper.selectById(id);
        }else {
            return null;
        }
    }

    @Override
    public long getUserId(String username) {
        Object o = userMapper.selectByMap(Map.of("username", username)).get(0).getId();
        if(o == null){
            return -1;
        }else {
            return (long) o;
        }
    }

    @Override
    public int editUser(User u) {
        return userMapper.updateById(u);
    }

    /**
     * 微信登录
     * @param userLoginDTO
     * @return
     */
    public User wxLogin(UserLoginDTO userLoginDTO) {
        String openid = getOpenid(userLoginDTO.getCode());

        //判断openid是否为空，如果为空表示登录失败，抛出业务异常
        if(openid == null){
            throw new LoginFailedException(MessageConstant.LOGIN_FAILED);
        }

        //判断当前用户是否为新用户
        User user = userMapper.selectByMap(Map.of("openid", openid)).get(0);

        //如果是新用户，自动完成注册
        if(user == null){
            user = User.builder()
                    .openid(openid)
                    .createdAt(LocalDateTime.now())
                    .build();
            userMapper.insert(user);
        }

        //返回这个用户对象
        return user;
    }

    /**
     * 调用微信接口服务，获取微信用户的openid
     * @param code
     * @return
     */
    private String getOpenid(String code){
        //调用微信接口服务，获得当前微信用户的openid
        Map<String, String> map = new HashMap<>();
        map.put("appid",weChatProperties.getAppid());
        map.put("secret",weChatProperties.getSecret());
        map.put("js_code",code);
        map.put("grant_type","authorization_code");
        String json = HttpClientUtil.doGet(WX_LOGIN, map);

        JSONObject jsonObject = JSON.parseObject(json);
        String openid = jsonObject.getString("openid");
        return openid;
    }

    public String callDashScope(String prompt){
        try {
           String res = DashScopeUtil.callWithMessage(prompt);
           return res;
        }catch (ApiException | NoApiKeyException | InputRequiredException e){
            log.error("call dashscope error, {}", e.getMessage());
            return MessageConstant.LOGIN_FAILED;
        }
    }
}

