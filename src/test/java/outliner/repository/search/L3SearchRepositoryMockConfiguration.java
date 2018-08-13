package outliner.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of L3SearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class L3SearchRepositoryMockConfiguration {

    @MockBean
    private L3SearchRepository mockL3SearchRepository;

}
