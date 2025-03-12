using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Hubs;
using Models;
using Microsoft.AspNetCore.SignalR; namespace SignalRDemo.Controllers
{
public class AdminController : Controller
{
   private readonly IHubContext<NotificationHub> _notificationHubContext;
 public AdminController(IHubContext<NotificationHub>notificationHubContext)
{
_notificationHubContext = notificationHubContext;
}
public IActionResult Index()
{
     return View();
}
[HttpPost]
public async Task<IActionResult> Index(Article model)
{
     await _notificationHubContext.Clients.All.SendAsync("sendToUser", model.articleHeading, model.articleContent);
     return View();
     }
   }
}
