using System.ComponentModel.DataAnnotations;

namespace The_Cakery.DTO
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Displayname { get; set; }
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}" +
            "{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", ErrorMessage = "Password must have 1 UpperCase, 1 Lowercase ," +
            "1 number , 1 non alphanumric and at least 6 characters")]
        public string Password { get; set; }
    }
}
