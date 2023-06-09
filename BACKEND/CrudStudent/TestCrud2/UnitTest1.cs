using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace TestCrud2
{
	public class UnitTest1
: IClassFixture<WebApplicationFactory<Startup>>
	{
		private readonly WebApplicationFactory<Program> _factory;

		public UnitTest1(WebApplicationFactory<Program> factory)
		{
			_factory = factory;
		}

		[Fact]
		public async Task TestMethod1()
		{
			var client = _factory.CreateClient();
			var response = await client.GetAsync("api/Student/GetStudents");
			Xunit.Assert.NotNull(response);
		}

	}
}