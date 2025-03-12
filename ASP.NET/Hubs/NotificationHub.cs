using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Hubs.Clients;

namespace Hubs 
{
   public class NotificationHub : Hub<IChatClient> 
   {

   }
}