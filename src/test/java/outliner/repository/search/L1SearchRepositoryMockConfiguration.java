package outliner.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of L1SearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class L1SearchRepositoryMockConfiguration {

    @MockBean
    private L1SearchRepository mockL1SearchRepository;

}
