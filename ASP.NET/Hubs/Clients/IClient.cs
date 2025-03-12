using System.Threading.Tasks;

namespace Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(string message);
    }
}