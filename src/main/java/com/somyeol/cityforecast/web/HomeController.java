// src/main/java/com/somyeol/cityforecast/web/HomeController.java
package com.somyeol.cityforecast.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/top10")
    public String top10() {
        return "top10";
    }
}