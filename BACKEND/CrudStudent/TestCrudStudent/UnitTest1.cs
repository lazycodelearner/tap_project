using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net;

namespace TestCrudStudent
{
	[TestClass]
	public class UnitTest1
	{
	
		
			private HttpClient? _httpClient;


			// ...code...

			[Fact]
			public async void testGetApi()
			{
				var webAppFactory = new WebApplicationFactory<Program>();
				_httpClient = webAppFactory.CreateDefaultClient();
				//// Act
				var response = await _httpClient.GetAsync("api/Student/GetStudents");

				// Assert
				response.EnsureSuccessStatusCode();
				var stringResponse = await response.Content.ReadAsStringAsync();
				Xunit.Assert.NotNull(stringResponse);



			}

		}

	}
