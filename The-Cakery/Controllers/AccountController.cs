using AutoMapper;
using Core.identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using The_Cakery.DTO;
using The_Cakery.Errors;
using The_Cakery.Extentions;

namespace The_Cakery.Controllers
{
    public class AccountController:BaseController
    {
        private readonly UserManager<AppUser> usermanger;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;

        public AccountController(UserManager<AppUser> usermanger , SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper)
        {
            this.usermanger = usermanger;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;
            var user = await usermanger.FindByEmailAsync(email);

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpGet("emailexisit")]
        public async Task<ActionResult<bool>> CheckEmailExisit([FromQuery] string email)
        {
            return await usermanger.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetAddress()
        {
            var user = await usermanger.FindUserWithAddressByEmail(HttpContext.User);

            return  mapper.Map<Address,AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateAddressUser(AddressDto address)
        {
            var user = await usermanger.FindUserWithAddressByEmail(HttpContext.User);

            user.Address = mapper.Map<AddressDto,Address>(address);
            var resault = await usermanger.UpdateAsync(user);
            if (!resault.Succeeded) return BadRequest("something went wrong updateing the address");

            return mapper.Map<Address, AddressDto>(user.Address);
        }


        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await usermanger.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized(new ApiResponse(401));
          
            var resault = await signInManager.CheckPasswordSignInAsync(user ,loginDto.Password,false);

            if(!resault.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = tokenService.CreateToken(user)
            };
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerdto)
        {
            if (CheckEmailExisit(registerdto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[]
                { "Email address already in use" } });
            }
            var user = new AppUser
            {
                DisplayName = registerdto.Displayname,
                Email = registerdto.Email,
                UserName=registerdto.Email
            };
            
            var resault = await usermanger.CreateAsync(user , registerdto.Password);
            if (!resault.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Email=user.Email,
                Token= tokenService.CreateToken(user)
            };
        }
    }
}
