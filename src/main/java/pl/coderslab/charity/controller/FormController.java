package pl.coderslab.charity.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class FormController {

    @PostMapping("/form")
    public String formAction(Model model)
    {
        return "form";
    }
}
