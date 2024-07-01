package com.xjtlu.aimini.util;

import com.alibaba.dashscope.aigc.generation.Generation;
import com.alibaba.dashscope.aigc.generation.GenerationParam;
import com.alibaba.dashscope.aigc.generation.GenerationResult;
import com.alibaba.dashscope.common.Message;
import com.alibaba.dashscope.common.Role;
import com.alibaba.dashscope.exception.ApiException;
import com.alibaba.dashscope.exception.InputRequiredException;
import com.alibaba.dashscope.exception.NoApiKeyException;
import com.alibaba.dashscope.utils.JsonUtils;

import java.util.ArrayList;
import java.util.List;

public class DashScopeUtil {

    public static String callWithMessage(String msg) throws NoApiKeyException, ApiException, InputRequiredException {
        Generation gen = new Generation();
        List<Message> messages = new ArrayList<>();
        String prompt = "";//todo system prompt需要详细调教

        Message systemMsg =
            Message.builder().role(Role.SYSTEM.getValue()).content(prompt).build();
        Message userMsg = Message.builder().role(Role.USER.getValue()).content(msg).build();
        messages.add(systemMsg);
        messages.add(userMsg);
        GenerationParam param =
            GenerationParam.builder().model(Generation.Models.QWEN_TURBO).messages(messages)
                .resultFormat(GenerationParam.ResultFormat.MESSAGE)
                .build();
        GenerationResult result = gen.call(param);
        //获取封装的GPT输出消息
        return result.getOutput().getChoices().get(0).getMessage().getContent();
  }
}
